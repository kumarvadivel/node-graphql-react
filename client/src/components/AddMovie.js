import React,{Component} from 'react';
import {addMovies} from '../queries/queries'
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getDirectors,getMovies} from '../queries/queries.js';

class AddMovie extends Component {
    constructor(props){
       super(props);
       this.state={
           name: '',
           category: '',
           directorid:''
       }
    }
    displayAuthors(){
        var data =this.props.getDirectors;
        
        if(data.loading){
            return (<option disabled>Loading</option>)
        }else{
            return data.directors.map(director =>{
                return (<option key={director.id} value={director.id}>{director.name}</option>)
            })
        }
    }
    submitform(e){
        e.preventDefault();
        console.log(this.state)
        this.props.addMovies({
            variables: {
                name:this.state.name,
                category:this.state.category,
                directorid:this.state.directorid
            },
            refetchQueries:[{query:getMovies}]
        })
    }
    render(){
      
        return(
            <form id="add-book" onSubmit={this.submitform.bind(this)}>
            <div className="field">
                <label>Movie name:</label>
                <input type="text"  onChange={(e)=>this.setState({name: e.target.value})}/>
            </div>
            <div className="field">
                <label>category:</label>
                <input type="text"  onChange={(e)=>this.setState({category: e.target.value})} />
            </div>
            <div className="field">
                <label>Director:</label>
                <select  onChange={(e)=>this.setState({directorid: e.target.value})}>
                    <option>Select author</option>
                    { this.displayAuthors() }
                </select>
            </div>
            <button>+</button>

        </form>
           
        )
    }
}

export default compose(graphql(getDirectors,{name:"getDirectors"}),
graphql(addMovies,{name:"addMovies"}))
(AddMovie)