import React, {Component} from 'react';
import RecipeList from './recipe_list';
import {reducer} from '../reducers';
import { connect } from 'react-redux';
import RecipeListItem from './recipe_list_item';

function searchingFor(text,recipe){
      return recipe.name.toLowerCase().includes(text.toLowerCase());
}
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            recipe:'',
            text:'',
            showRecipe:false,

        }
    this.searchHandler=this.searchHandler.bind(this);
    }
    searchHandler(event){
        //console.log(event.target.value);
        this.setState({text:event.target.value})
    }

    handleClick(recipe) {
        this.setState({
            showRecipe: (this.state.showRecipe) ? false : true,
            recipe
        })
        console.log('count');
    }
    render() {
        const{text} = this.state;
        const {recipes}=this.props;
       
       // console.log(recipes);
        let filteredRecipes=recipes.filter(recipe => searchingFor(text,recipe));
        if(!text){
           filteredRecipes=[];
        }
        //console.log(filteredRecipes);
        return (
        <div className="search_bar">
            <form>
           <input type="text"
            onChange={this.searchHandler}
                        value={text} />
             </form>   
            
                {filteredRecipes.map((recipe, index) => {
                    return <li key={index} onClick={() => this.handleClick(recipe)}>{recipe.name}</li>
                })}
                { <div className="recipe_list" style={{ 'display': (this.state.showRecipe) ? 'block' : 'none' }}>
                    <RecipeListItem recipe={this.state.recipe} handle={(e) => this.handleClick(e)} />
                        </div>}
           
         </div>
        );
    }
}
const mapStateToProps = (state) => ({
    recipes: state.recipes
})

export default connect(mapStateToProps)(SearchBar);