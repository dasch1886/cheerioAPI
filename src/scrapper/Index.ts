import * as cheerio from 'cheerio';
import * as pr from 'request-promise';
import { getRecipes } from './SplitData';
import { recipe } from '../models/Recipe';
import { author } from '../models/Author';
import { ingredient } from '../models/Ingredient';
import { unit } from '../models/Unit';

export const host = 'http://www.przepisy.pl';
export const mainUri = ['/przepisy/influencerzy'];

export const options: pr.RequestPromiseOptions = {
    method: 'GET',
    host: '',
    headers: {
        'User-Agent': 'cheerioAPI',
    }
};

export async function Initscrapping() {
    for (const uri of mainUri) {
        options.host = host + uri;
        await pr(options.host, options).then((response) => {
            const $ = cheerio.load(response);
            getRecipes($).then(res => {

                const recipes = getUnique(res, 'name');
                setRecipesToDB(recipes);

                const authors = getArrayFromProperty(getUnique(res, 'author'), 'author');
                setAuthorsToDB(authors);

                const ingredients = getUnique(getArrayFromProperty(res, 'ingredients').flat().map(el => {
                    return { name: el.name.toLowerCase() };
                }), 'name');
                setIngeridentToDB(ingredients);

                const units = getUnique(getArrayFromProperty(res, 'ingredients').flat().map(el => {
                    return { name: el.unitName.toLowerCase() };
                }), 'name');
                
                setUnitToDB(units);
            });
        });
    }
}

async function setRecipesToDB(recipes: Array<any>) {
    recipes.forEach(async (el) => {
        await recipe.create({
            name: el.name,
            author: el.author,
            desc: el.desc,
            ingredients: el.ingredients,
            imgPath: el.imgPath
        }).then(doc => {
            console.log('Scrapping done');
        }).catch(err => {
            console.info('Error during adding recipe to db');
        });
    })
}

async function setAuthorsToDB(authors: Array<any>) {
    authors.forEach(async (el) => {
        await author.create({
            name: el
        }).then(doc => {
            console.log('Author added');
        }).catch(err => {
            console.info('Error during adding author to db');
        });
    })
}

async function setIngeridentToDB(ingredients: Array<any>) {
    ingredients.forEach(async (el) => {
        await ingredient.create({
            name: el.name
        }).then(doc => {
            console.log('Ingredient added');
        }).catch(err => {
            console.info('Error during adding ingredient to db');
        });
    })
}

async function setUnitToDB(units: Array<any>) {
    units.forEach(async (el) => {
        await unit.create({
            name: el.name
        }).then(doc => {
            console.log('Unit added');
        }).catch(err => {
            console.info('Error during adding unit to db');
        });
    })
}

function getUnique(arr, comp) {

    const unique = arr
        //store the comparison  values in array
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);

    return unique;
}

function getArrayFromProperty(arr: Array<any>, property) {
    return arr.map(el => {
        return el[property];
    })

}