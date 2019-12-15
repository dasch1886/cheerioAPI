import * as cheerio from 'cheerio';
import { options, host } from './Index';
import * as pr from 'request-promise';
import * as fs from 'fs';

const getRecipeDetailsUrl = /.*www.przepisy\.pl/;
const getImgName = /[^\/]*\.(jpg|png|jpeg)/;
export const imagesPath = 'public/';

export async function getRecipes(htmlDoc: CheerioStatic): Promise<Array<any>> {
    const $ = htmlDoc;

    const tmp: Array<any> = $('app-recipe-wrapper').map((i, el) => {
        return el
    }).toArray();

    const recipes = tmp.map(async (el) => {
        const data = {
            name: '',
            author: '',
            desc: '',
            ingredients: [],
            imgPath: ''
        };

        data.author = getAuthor($, el);
        data.name = getRecipeTitle($, el);

        const link = getRecipeDetailsLinkHref($, el);
        const settings: pr.RequestPromiseOptions = options;
        settings.host = host + link.replace(getRecipeDetailsUrl, '');

        await getRecipeDetailsHtml(settings).then(async (res) => {
            const recipeDetails = cheerio.load(res);

            data.ingredients = getRecipeIngredients(recipeDetails);
            data.desc = getRecipeDesc(recipeDetails);

            const imgUri = getImgUri(recipeDetails);
            const imgName = imgUri.match(getImgName)[0];

            await getImage(imgUri, settings).then((imgFile) => {

                fs.writeFileSync(`${imagesPath}_${imgName}`, imgFile);

                data.imgPath = `_${imgName}`;

            }).catch(err => console.warn(`Problem with get image`));

        }).catch(err => console.warn(`Problem with recipe details site`));

        return data;
    });

    return Promise.all(recipes);
};

function getImage(uri: string, options: pr.RequestPromiseOptions): pr.RequestPromise {
    const settings = options;
    settings.host = uri.replace(getRecipeDetailsUrl, '');
    settings.encoding = null;
    return pr(uri, settings);
}

function resetRecipe(recipe) {
    recipe.name = '';
    recipe.ingredients = [];
    recipe.author = '',
        recipe.desc = '';
    recipe.img = '';
};

function getAuthor($: CheerioStatic, el: CheerioElement): string {
    return $(el).find('.author-name').text();
};

function getRecipeTitle($: CheerioStatic, el: CheerioElement): string {
    return $(el).find('a.recipe-box__title').text();
}

function getRecipeDetailsLinkHref($: CheerioStatic, el: CheerioElement): string {
    return $(el).find('.recipe-box > a').attr('href');
}

function getRecipeIngredients($: CheerioStatic): Array<any> {
    return $('.ingredient-ul .row-ingredient').map((i, el) => {
        return {
            name: $(el).find('.ingredient-name').text(),
            amount: $(el).find('.quantity').text().split(' ')[0],
            unitName: $(el).find('.quantity').text().split(' ')[1],
        }
    }).toArray();
}

function getRecipeDesc($: CheerioStatic): string {
    return $('.recipe-container-steps li').map((i, el) => {
        return $(el).find('.step-responsive-text').text();
    }).toArray().toString();
}

function getImgUri($: CheerioStatic): string {
    return $('.image-container').find('img').attr('data-src');
}

function getRecipeDetailsHtml(options: pr.RequestPromiseOptions): pr.RequestPromise {
    return pr(options.host, options);
}