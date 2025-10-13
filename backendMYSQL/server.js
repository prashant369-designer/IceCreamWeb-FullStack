    const express = require('express');
    const cors = require('cors');

    const app = express();
    app.use(cors());
    const PORT = process.env.PORT || 3000;

    app.use(express.json()); 

//auth
app.use('/api/auth', require('./routes/auth.routes'));
// Blogs routes
app.use('/api/blog', require('./routes/blog.routes'));
// Category routes
app.use('/api/category', require('./routes/category.routes'));
// Clientview routes    
app.use('/api/clientview', require('./routes/clientview.routes'));
// Product routes
app.use('/api/product', require('./routes/product.routes'));
//location
app.use('/api/location', require('./routes/restaurant.routes'));
//contact
app.use('/api/contact', require('./routes/contacr.routes'));
//hero banner
app.use('/api/herobanner', require('./routes/herobanner.routes'));
//cart
app.use('/api/cart', require('./routes/cart.routes'));

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });