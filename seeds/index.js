const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to mongoose')
    })
    .catch(err => {
        console.log('Not Connected to mongoose');
        console.log(err)
    });

const descrip = (array) => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 350; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${descrip(descriptors)} ${descrip(places)}`,
            geometry: {
                type: "Point", 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqgmlres3/image/upload/v1645643631/YelpCamp/wrbmermopdipekewuh1f.jpg',
                    filename: 'd2jxlavcygh6pip3os0f'
                }
            ],
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere saepe vitae fugit. Voluptates repudiandae ipsam, nesciunt 
            totam ad tempora fugit consequuntur! Impedit, illo ea? Corporis impedit voluptas magni nam dignissimos!
            Quisquam, ab architecto hic, rerum fuga est sint aliquid consectetur autem atque, maiores distinctio voluptates vel? Iure possimus, 
            impedit quis quibusdam, laudantium sint minima, eligendi reprehenderit veniam est nulla. Quae?`,
            price: price,
            //MY AUTHOR ID
            author: '6210dfd2bda695b07df9bc5e'
        });
        await camp.save();
    }

}
seedDB()
    .then(() => {
        mongoose.connection.close();
    })