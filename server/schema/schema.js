const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

const Movies = require('../models/movie');
const Directrors = require('../models/directors')
/*
// All IDs set automatically by mLab
// Don't forget to update after creation
const directorsJson = [
  { "name": "Quentin Tarantino", "age": 55 }, // 5f746661864e78412e4a50c0
  { "name": "Michael Radford", "age": 72 }, // 5f7466a7864e78412e4a50c1
  { "name": "James McTeigue", "age": 51 }, // 5f7466ca864e78412e4a50c2
  { "name": "Guy Ritchie", "age": 50 }, // 5f7466e1864e78412e4a50c3
];
// directorId - it is ID from the directors collection
const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "5f746661864e78412e4a50c0" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "5f7466a7864e78412e4a50c1" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "5f7466ca864e78412e4a50c2" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "5f7466e1864e78412e4a50c3" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "5f746661864e78412e4a50c0" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "5f746661864e78412e4a50c0" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "5f746661864e78412e4a50c0" },
  { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "5f7466e1864e78412e4a50c3" },
];
const movies = [
  { id: '1', name: "Pulp Fiction", genre: "Crime", directorId: "1" },
  { id: '2', name: "1984", genre: "Sci-Fi", directorId: "2" },
  { id: '3', name: "V for vendetta", genre: "Sci-Fi-Triller", directorId: "3" },
  { id: '4', name: "Snatch", genre: "Crime-Comedy", directorId: "4" },
  { id: '5', name: "Reservoir Dogs", genre: "Crime", directorId: "1" },
  { id: '6', name: "The Hateful Eight", genre: "Crime", directorId: "1" },
  { id: '7', name: "Inglourious Basterds", genre: "Crime", directorId: "1" },
  { id: '8', name: "Lock, Stock and Two Smoking Barrels", genre: "Crime-Comedy", directorId: "4" },
];
const directors = [
	{ id: '1', name: "Quentin Tarantino", age: 55 },
  { id: '2', name: "Michael Radford", age: 72 },
  { id: '3', name: "James McTeigue", age: 51 },
  { id: '4', name: "Guy Ritchie", age: 50 },
];
*/

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args){
      //  return directors.find(({ id }) => id === parent.directorId)
        return Directrors.findById(parent.directorId)
      }
    }
  })
})

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args){
       // return movies.filter(({directorId})=> directorId === parent.id)
       return Movies.find({directorId: parent.id})
      }
    }
  })
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
       // return movies.find(({ id }) => id === args.id)
       return Movies.findById(args.id)
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
       // return directors.find(({ id }) => id === args.id)
       return Directrors.findById(args.id)
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args){
       // return movies
       return Movies.find({})

      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args){
       // return directors
       return Directrors.find({})

      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: Query
})