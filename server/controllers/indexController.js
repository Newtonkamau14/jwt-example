const indexPage = (req,res) => {
    res.render("index",{
        title: "Homepage"
    })
}

const getAllCharacters = (req,res) => {
    res.render("characters",{
        title: "Characters"
    })
}


module.exports = {indexPage,getAllCharacters}