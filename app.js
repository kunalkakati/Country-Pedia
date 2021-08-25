const express = require("express");
const ejs = require("ejs");
const axios = require("axios").default;
const { response } = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("Home");
});

app.get("/search", (req, res) => {
    res.render("Search_country");
});

app.get("/about", (req, res) => {
    res.render("About");
});

function convertToInternationalCurrencySystem(labelValue) {


    if (Math.abs(Number(labelValue)) >= 1.0e+9) {
        return (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B";
    } else {
        if (Math.abs(Number(labelValue)) >= 1.0e+6) {
            return (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M";
        } else {
            if (Math.abs(Number(labelValue)) >= 1.0e+3) {
                return (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K";
            } else {
                return Math.abs(Number(labelValue));
            }
        }
    }
}

app.get("/All_Country", (req, res) => {


    const opt = "https://restcountries.eu/rest/v2/all";
    axios.request(opt).then(function (response) {
        const all_data = response.data;

        let dataArray = [];

        for (let i = 0; i < all_data.length; i++) {
            const countryName = all_data[i].name;
            const capital = all_data[i].capital;
            const alsoKnown = all_data[i].altSpellings.join(", ");
            const reagion = all_data[i].region;
            const papulation = all_data[i].population;
            const p = convertToInternationalCurrencySystem(papulation);
            const area = all_data[i].area;
            const time = all_data[i].timezones[0];
            const language = all_data[i].languages;
            let lngArray = [];
            for (let l = 0; l < language.length; l++) {
                let lang = language[l].name;
                lngArray.push(lang);
            }

            const all_language = lngArray.join(",");
            const border = all_data[i].borders.join(",");
            const flageImage = all_data[i].flag;

            let obj = {
                "name": countryName,
                "capital": capital, "alsoKnown": alsoKnown, "reagion": reagion, "papulation": p, "area": area, "time": time, "language": all_language, "border": border, "flagURL": flageImage
            };
            dataArray.push(obj);
        }
        res.render("Country", { CountryInfo: dataArray });
    }).catch(function (error) {
        console.error(error + "Error at axios path: /All Country");
    });

});



app.post("/search", function (req, res) {
    const Url = `https://restcountries.eu/rest/v2/name/${req.body.inputText}`;

    axios.request(Url).then(function (response) {
        // console.log(respound.data);
        const all_data = response.data;

        let dataArray = [];

        for (let i = 0; i < all_data.length; i++) {
            const countryName = all_data[i].name;
            const capital = all_data[i].capital;
            const alsoKnown = all_data[i].altSpellings.join(", ");
            const reagion = all_data[i].region;
            const papulation = all_data[i].population;
            const p = convertToInternationalCurrencySystem(papulation);
            const area = all_data[i].area;
            const time = all_data[i].timezones[0];
            const language = all_data[i].languages;
            let lngArray = [];
            for (let l = 0; l < language.length; l++) {
                let lang = language[l].name;
                lngArray.push(lang);
            }

            const all_language = lngArray.join(",");
            const border = all_data[i].borders.join(",");
            const flageImage = all_data[i].flag;

            let obj = {
                "name": countryName,
                "capital": capital, "alsoKnown": alsoKnown, "reagion": reagion, "papulation": p, "area": area, "time": time, "language": all_language, "border": border, "flagURL": flageImage
            };
            dataArray.push(obj);
        }
        res.render("search_data", { CountryInfo: dataArray });
    }).catch(function (err) {

        res.json('make sure you spelled correct');
        console.error(err + "Error in search");
        res.redirect("/search");
    });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});