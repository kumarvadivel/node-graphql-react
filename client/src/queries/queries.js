import {gql} from 'apollo-boost';

// eslint-disable-next-line
const getDirectors =gql`

{
    directors{
        name
        age
        id
    }
}
`
// eslint-disable-next-line
const getMovies =gql`

{
    movies{
        name
        category
        id
    }
}
`
const getbook=gql`
    query($id:ID!){
        movie(id:$id){
            id
            name
            category
            director{
                id
                name
                age
                movies{
                    name
                    category
                }
            }
        }
    }
`
const addMovies = gql`
mutation($name:String!,$category:String!,$directorid:ID!){
    addmovie(name:$name,category:$category,directorid:$directorid){
        name
        id
    }
}
`
export {getMovies,getDirectors,addMovies,getbook}