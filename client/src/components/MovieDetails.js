import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getbook} from '../queries/queries.js'
class MovieDetails extends Component {
   displaymovies(){
       var {movie}=this.props.data
       if(movie){
           return (
               <div>
                   <h2>{movie.name}</h2>
                   <p>{movie.category}</p>
                   <p>{movie.director.name}</p>
                   <p>All movies by this director</p>
                   <ul>
                      { movie.director.movies.map(item=>{
                           return <li>{item.name}</li>
                       })}
                   </ul>
               </div>
           )

       }else{
           return (<div> no movies selected
             </div>)
       }
   }
    render(){
     
       
      
        return(
            <div>
              
               {this.displaymovies()}
            </div>
           
        )
    }
}

export default graphql(getbook,{
    options:(props)=>{
        return{
            variables:{
                id:props.id
            }
        }
    }
})(MovieDetails)