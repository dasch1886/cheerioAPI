import * as cheerio from 'cheerio';
import * as pr from 'request-promise';
import { getRecipes } from './SplitData';
import { recipe } from '../models/Recipe';

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
    for(const uri of mainUri) {
        options.host = host + uri;
        await pr(options.host, options).then((response) => {
            const $ = cheerio.load(response);
            getRecipes($).then(res => {
                const recipes = getUnique(res, 'name');
                setRecipesToDB(recipes);
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