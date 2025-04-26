const express = require('express')
const admin = require('firebase-admin');
const { db } = require('../firebase');

const registerUser = async (req,res) =>{
    const {firstName, lastName, email, password} = req.body

    try{
        if (!email.endsWith('@sdsu.edu')){
            return res.status(400).json({ error: 'Email must be an @sdsu.edu address.' });
        }

        // create user in db
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: `${firstName} ${lastName}`,
          });
        
        const uid = userRecord.uid
          
        // store user info in db
        await db.collection('users').doc(uid).set({
            firstName,
            lastName,
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          });
        
        res.status(201).json({
            message: 'User registered successfully',
            uid,
            email,
            firstName,
            lastName
        });
    } catch(error){
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body
    try{
        
        const user = await admin.auth().getUserByEmail(email)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
        
        res.status(200).json({
            message: 'User found. Please authenticate from frontend.',
            uid: user.uid,
            email: user.email
        });
    } catch(error){
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = { registerUser, loginUser};