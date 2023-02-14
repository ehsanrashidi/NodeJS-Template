module.exports = {
    init:(app)=>{
        app.use((req, res, next)=> {
            console.log(`${req.method} ${req.url}`);
            next();
          });
          
    }
    
}