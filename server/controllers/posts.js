const express = require('express')
const admin = require('firebase-admin');
const { db } = require('../firebase');

const getPosts = async (req,res)=>{
    try {
        const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        res.status(200).json(posts);
      } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ error: 'Failed to get posts' });
      }
}

const getIndividualPost = async (req,res)=>{
    const { id } = req.params;

  try {
    const doc = await db.collection('posts').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = { id: doc.id, ...doc.data() };
    res.status(200).json(post);
  } catch (error) {
    console.error('Error getting individual post:', error);
    res.status(500).json({ error: 'Failed to get post' });
  }
}

const createPost = async(req,res)=>{
    const { name, description, price, photoUrl } = req.body;

    if (!name || !description || !price || !photoUrl) {
      return res.status(400).json({ error: 'Missing fields. Name, description, price, and photoUrl are required.' });
    }
  
    try {
      const newPost = {
        name,
        description,
        price,
        photoUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
  
      const docRef = await db.collection('posts').add(newPost);
  
      res.status(201).json({ id: docRef.id, ...newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
}

module.export = {getPosts,getIndividualPost,createPost}