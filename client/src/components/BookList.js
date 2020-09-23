import React,{Component} from 'react';
import MovieDetails from '../components/MovieDetails'
import {graphql} from 'react-apollo';
import {getMovies} from '../queries/queries';
class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:null
        }
    }
    displayBooks(){
        var data=this.props.data;
        if (data.loading)
            return (<div>loadings movies</div>)
        else
            return data.movies.map(movie=>{
                return(
                    <li key={movie.id} onClick={(e)=>{this.setState({selected:movie.id})}}>{movie.name}</li>
                )
            })
    }
    render(){
       
        return(
            <div>
               <ul>
                {this.displayBooks()}
            </ul>  
            <MovieDetails id={this.state.selected}/>
            </div>
           
        )
    }
}

export default graphql(getMovies)(BookList)