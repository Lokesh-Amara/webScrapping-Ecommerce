import mongoose from "mongoose";

const webSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true 
    },
    price : [{type : Number, required : true}],
    fPrice :  [{type : Number, required : true}],
    rating : [{type : Number, required : true}],
    tag : {
        type : String,
        required : false
    }
});

export const webData = mongoose.model('webData', webSchema);    