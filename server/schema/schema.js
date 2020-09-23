const graphql = require('graphql');
const  _=require('lodash');
const Movie=require('../models/movie.js')
const Director=require('../models/director')
const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
}=graphql;


const MovieType = new GraphQLObjectType({
    name:"movie",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        category:{type:GraphQLString},
        director:{
            type:DirectorType,
            resolve(parent,args){
           // console.log(parent)
            //return _.find(directors,{id:parent.directorid})
            return Director.findById(parent.directorid)
            }
        }
    })
})
const DirectorType = new GraphQLObjectType({
    name:"director",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        movies:{
            type:new GraphQLList(MovieType),
            resolve(parent,args){
                //return _.filter(movies,{directorid:parent.id})
                return Movie.find({directorid:parent.id})
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        adddirector:{
            type:DirectorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let director =new Director({
                    name:args.name,
                    age:args.age
                })
                return director.save()
            }
        },
        addmovie:{
            type:MovieType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                category:{type:new GraphQLNonNull(GraphQLString)},
                directorid:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let movie=new Movie({
                    name:args.name,
                    category:args.category,
                    directorid:args.directorid
                })
                return movie.save();
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //console.log(typeof(args.id))
              //return  _.find(movies,{id:args.id})
              return Movie.findById(args.id)
            }
        },
        director:{
            type:DirectorType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                //return _.find(directors,{id:args.id})
                return Director.findById(args.id)
            }
        },
        directorname:{
            type:DirectorType,
            args:{
                name:{type:GraphQLString}
            },
            resolve(parent,args){
                //return _.find(directors,{id:args.id})
                return Director.find({name:args.name})
            }
        },
        movies:{
            type:new GraphQLList(MovieType),
            resolve(parent,args){
                //return movies
                return  Movie.find({})
            }
        },
        directors:{type:new GraphQLList(DirectorType),
        resolve(parent,args){
            //return directors
            return Director.find({})
        }}
    }
})

module.exports= new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})