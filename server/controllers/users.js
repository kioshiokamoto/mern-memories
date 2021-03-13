import mongoose from 'mongoose';
import bcript from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			res.status(404).json({ message: 'User doesnt exist' });
		}
		const isPasswordCorrect = await bcript.compare(password, existingUser.password);
		if (!isPasswordCorrect) {
			res.status(400).json({ message: 'Invalid credentials' });
		}
        //Es recomendable guardar el secret password del token en las variables de entorno
        const token = jwt.sign({email:existingUser.email, id:existingUser._id},'test',{expiresIn:"1h"});

        res.status(200).json({result:existingUser, token})
	} catch (error) {
        res.status(500).json({message:'Something went wrong.'})
    }
};
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        //Validaciones
		if (existingUser) {
			res.status(400).json({ message: 'User already exists' });
		}
        if (password !== confirmPassword){
            res.status(400).json({ message: "Passwords don't match" });
        }
        //Se hashea contraseña
        const hashedPassword = await bcript.hash(password,12);
        
        //Se crea usuario
        const result = await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});

        //Es recomendable guardar el secret password del token en las variables de entorno
        const token = jwt.sign({email:result.email, id:result._id},'test',{expiresIn:"1h"});

        res.status(200).json({result:result, token})

    } catch (error) {
        res.status(500).json({message:'Something went wrong.'})
    }

};
