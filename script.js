let data = [
    {
        "filename":"1.jpg",
        "name": "Repkové pole",
        "description": "Pole plné repky olejnej niekde za Ružindolom",
        "date":"6.5.2020",
        "coordinates":[48.370037, 17.469789],
        "path":"/photos/1.jpg"
    },
    {
        "filename":"2.jpg",
        "name": "Výhľad na hory",
        "description": "Výhľad na východ slnka nad horami",
        "date":"2.3.2022",
        "coordinates":[46.80044876051801, 13.611891792061295],
        "path":"/photos/2.jpg"
    },
    {
        "filename":"3.jpg",
        "name": "Impozantný kaktus",
        "description": "Kaktus na stene v kaktusovej záhrade",
        "date":"27.6.2022",
        "coordinates":[29.08107787842252, -13.473440256638664],
        "path":"/photos/3.jpg"
    },
    {
        "filename":"4.jpg",
        "name": "Kaňon",
        "description": "Kaňon Las Grietas",
        "date":"28.6.2022",
        "coordinates":[28.974528679739464, -13.635363630687099],
        "path":"/photos/4.jpg"
    },
    {
        "filename":"5.jpg",
        "name": "Výhľad na more",
        "description": "Voda je modrá",
        "date":"30.6.2022",
        "coordinates":[28.86259907707701, -13.86020863068296],
        "path":"/photos/5.jpg"
    },
    {
        "filename":"6.jpg",
        "name": "Obloha",
        "description": "Diera v strope",
        "date":"5.8.2022",
        "coordinates":[43.50873290911745, 16.4400111],
        "path":"/photos/6.jpg"
    },
    {
        "filename":"7.jpg",
        "name": "Západ slnka",
        "description": "Západ slnka nad morom",
        "date":"6.8.2022",
        "coordinates":[43.550957, 16.351390],
        "path":"/photos/7.jpg"
    },
    {
        "filename":"8,jpg",
        "name": "Hmla",
        "description": "Ranná hmla v horách",
        "date":"30.8.2022",
        "coordinates":[48.59594445550843, 19.565012994265064],
        "path":"/photos/8.jpg"
    },
    {
        "filename":"9.jpg",
        "name": "Táborisko",
        "description": "Takto vyzerá skautský tábor",
        "date":"27.8.2022",
        "coordinates":[48.59594445550843, 19.565012994265064],
        "path":"/photos/9.jpg"
    },
    {
        "filename":"10.jpg",
        "name": "Výstava",
        "description": "Výstava kaktusov a prírodného kameňa",
        "date":"16.9.2022",
        "coordinates":[48.78081211355137, 18.5752974830569],
        "path":"/photos/10.jpg"
    }
];

for(let i = 0; i < 10; i++) {
    const img = document.createElement("img");
    img.src = data[i].path;
    img.classList.add("img-margin");
    document.getElementById("gallery").appendChild(img);
}