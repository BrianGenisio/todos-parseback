class Backbone.ParseCollection extends Backbone.Collection
  parse: (resp, xhr) ->
    data = super
    data.results
    
  fetch: (options) ->
    if options?.query?
      options.data = "where=" + JSON.stringify options.query
      delete options.query
    super
    
class Backbone.ParseModel extends Backbone.Model
  setId: (data) ->
    data.id = data.objectId unless data.id
    data

  constructor: (model) ->
    @setId model
    super

  parse: (resp, xhr) ->
    @setId super

  toJSON: () ->
    result = super
    delete result.createdAt
    delete result.updatedAt
    result