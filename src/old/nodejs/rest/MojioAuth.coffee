# version 3.5.2
HttpNodeWrapper = require '../HttpNodeWrapper'
FormUrlencoded = require 'form-urlencoded'

# @nodoc
module.exports = class MojioClient

    defaults = { hostname: 'api.moj.io', port: '443', version: 'v1', scheme: 'https', signalr_scheme: 'http', signalr_port: '80', signalr_hub: 'ObserverHub', live: true }

    constructor: (@options) ->
        @options ?= { hostname: defaults.hostname, port: defaults.port, version: defaults.version, scheme: defaults.scheme, live: defaults.live }
        @options.hostname ?= defaults.hostname
        @options.port ?= defaults.port
        @options.version ?= defaults.version
        @options.scheme ?= defaults.scheme
        @options.signalr_port ?= defaults.signalr_port
        @options.signalr_scheme ?= defaults.signalr_scheme
        @options.signalr_hub ?= defaults.signalr_hub
        @options.application = @options.application
        @options.secret = @options.secret
        @conn = null
        @hub = null
        @connStatus = null
        @setToken(null)
        @options.tokenRequester ?= @getTokenId()

    ###
        Helpers
    ###
    getResults: (type, results) ->
        objects = []
        if (results instanceof Array)
            arrlength = results.length;
            objects.push(new type(result)) for result in results
        else if (results.Data instanceof Array)
            arrlength = results.Data.length;
            objects.push(new type(result)) for result in results.Data
        else if ((result.Data != null))
            objects.push(new type(result.Data))
        else
            objects.push(new type(result))

        return objects


    @_makeParameters: (params) ->
        '' if params.length==0
        query = '?'
        for property, value of params
            query += "#{encodeURIComponent property}=#{encodeURIComponent value}&"
        return query.slice(0,-1)

    getPath: (resource, id, action, key) ->
        if (key && id && action && id != '' && action != '')
            return "/" + encodeURIComponent(resource) + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(action) + "/" + encodeURIComponent(key);
        else if (id && action && id != '' && action != '')
            return "/" + encodeURIComponent(resource) + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(action);
        else if (id && id != '')
            return "/" + encodeURIComponent(resource) + "/" + encodeURIComponent(id);
        else if (action && action != '')
            return "/" + encodeURIComponent(resource) + "/" + encodeURIComponent(action);

        return "/" + encodeURIComponent(resource);

    dataByMethod: (data, method) ->
        switch (method.toUpperCase())
            when 'POST' or 'PUT' then return @stringify(data)
            else return data

    stringify: (data) ->
        return JSON.stringify(data)

    request: (request, callback, isOauth = false) ->
        HttpNodeWrapper(request, @getTokenId(), "https://accounts.moj.io/v2", null, callback)

    ###
        Authorize and Login
    ###
    login_resource: 'Login'

    authorize: (redirect_url, scope='full', callback) ->
        if (@options? and @options.secret? and @options.username? and @options.password?)
            @_login(@options.username, @options.password, callback)
        else
            parts = {
                hostname: @options.hostname
                host: @options.hostname
                port: @options.port
                scheme: @options.scheme
                path: if @options.live then '/OAuth2/authorize' else '/OAuth2Sandbox/authorize'
                method: 'Get'
                withCredentials: false
            }
            parts.path += "?response_type=token"
            parts.path += "&client_id=" + @options.application
            parts.path += "&redirect_uri="+redirect_url
            parts.path += "&scope="+scope
            parts.headers = {}
            parts.headers["MojioAPIToken"] = @getTokenId() if @getTokenId()?
            parts.headers["Content-Type"] = 'application/json'

            # url = parts.scheme+"://"+parts.host+":"+parts.port+parts.path
            HttpNodeWrapper.redirect(parts, (error, result) ->
                @setToken(result)
                return if (!callback?)
                callback(error, null) if error?
                callback(null, result)
            )

    token: (callback) ->
        @user = null

        token = @options.tokenRequester()
        match = !!token && token[1]
        if (!match)
            callback("token for authorization not found.", null)
        else
# get the user id by requesting login information, then set the auth_token:
            @request(
                {
                    method: 'GET', resource: @login_resource, id: match
                },
                (error, result) =>
                    if error
                        callback(error, null)
                    else
                        @setToken(result)
                        callback(null, @getToken())
            )

    unauthorize: (callback) ->
        if (@options? and @options.secret? and @options.username? and @options.password?)
            @_logout(callback)
        else if (@options? and @options.secret? and @options.application?)
            @_logout(callback)
        else
            @setToken(null)
            callback(null, "ok")

    _login: (username, password, callback) -> # Use if you want the raw result of the call.
        @request(
            {
                method: 'POST', resource: if @options.live then '/OAuth2/token' else '/OAuth2Sandbox/token',
                body:
                    {
                        username: username
                        password: password
                        client_id: @options.application
                        client_secret: @options.secret
                        grant_type: 'password'
                    }

            }, (error, result) =>
            @setToken(result)
            callback(error, result)
        , true
        )

# Login
    login: (username, password, callback) ->
        @_login(username, password, (error, result) =>
            @setToken(result)
            callback(error, result)
        )

    _logout: (callback) ->
        @request(
            {
                method: 'DELETE', resource: @login_resource,
                id: if mojio_token? then mojio_token else @getTokenId()
            }, (error, result) =>
            @setToken(null)
            callback(error, result)
        )

# Logout
    logout: (callback) ->
        @_logout((error, result) =>
            @setToken(null)
            callback(error, result)
        )

    ###
        Token/User
    ###
    isAuthorized: () ->
        return @auth_token? and @getToken()?

    setToken: (token) ->
# fix up the returned token and set _id and access_token fields to be the mojio token.
        if (token == null)
            @auth_token = { _id: null, access_token: null }
        else if typeof token is 'object' # token is an object of one of two structures
            @auth_token = token
            if (!@auth_token._id and token.access_token?) # token has access_token field but not _id
                @auth_token._id = token.access_token
            else if (!@auth_token.access_token and token._id?) # token has _id but not access_token
                @auth_token.access_token = token._id

            if (!@auth_token.access_token? and !@auth_token._id?)
                @auth_token.access_token = null
                @auth_token._id = null
        else # token is just a string.
            @auth_token = { _id: token, access_token: token } if token?

    getToken: () ->
        return @auth_token.access_token

    getTokenId:  () ->
        return @getToken()

    getRefreshToken: () ->
        return @auth_token.refresh_token

    getUserId:  () ->
        return @auth_token.UserId if @auth_token.UserId
        return null

    isLoggedIn: () ->
        return @getUserId() != null || @getToken()?

    getCurrentUser: (callback) ->
        if (@user?)
            callback(null, @user)
        else if (@isLoggedIn())
            @get(Login, @getToken(), (error, result) =>
                if error?
                    callback(error, null)
                else if (result.UserId?)
                    @get(User, result.UserId, (error, result) =>
                        if error?
                            callback(error, null)
                        else
                            @user = result
                            callback(null, @user)
                    )
                else
                    callback("User not found", null)
            )
        else
            callback("User not found", null)
            return false
        return true
