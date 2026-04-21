import type { Request, Response } from "express";
import contentModel from "../models/content.model.ts";
import crypto from 'crypto'
import LinkModel from "../models/link.model.ts";


const createContent = async (req: Request, res: Response) => {
  // Logic to create content
  const { link, type, title, tags } = req.body;

  //@ts-ignore
  const userId = req.user._id;
  // Validate input
  if (!link || !type || !title) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const response = await contentModel.create({
    link,
    type,
    title,
    tags,
    userId
  })

  if(!response){
    return res.status(500).json({ message: "Failed to create content" });
  }

  res.status(201).json({ message: "Content created successfully" });
};

const getContent = async (req: Request, res: Response) => {
  const {contentId} = req.params;

  if(!contentId){
    return res.status(401).json({
      message:"contentId is needed"
    })
  }

  const content = await contentModel.findById({_id:contentId});

  if(!content){
    return res.status(401).json({
      message:"content not found"
    })
  }

  res.status(200).json({
    content
  })
}

const getAllContent = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user._id;

  const contents = await contentModel.find({ userId }).populate("userId", "username email");

  if(!contents){
    return res.status(404).json({ message: "No content found" });
  }

  res.status(200).json(contents);
};

const deleteContent = async (req: Request, res: Response) => {
    const {contentId} = req.params;

    const response = await contentModel.findByIdAndDelete({_id:contentId});

    if(!response){
        return res.status(500).json({
            message:"not able to dlete content."
        })
    }
    
    return res.status(200).json({
        message: "content deleted sucessfully."
    })
};

const shareContent = async (req: Request, res: Response) => {
  const { contentId } = req.body;

  const hash = crypto.randomBytes(32).toString("hex");

  if (!contentId) {
    return res.status(401).json({
      message: "contentId is required",
    });
  }

  let link = await LinkModel.findOne({ contentId });

  if (link) {
    return res.status(200).json({
      link,
    });
  } else {
    //@ts-ignore
    const userId = req.user._id;

    link = await LinkModel.create({
      hash,
      contentId,
      userId,
    });

    if (!link) {
      return res.status(401).json({
        message: "link is not generated",
      });
    }

    res.status(200).json({
      link,
    });
  }
};

const getShareContent = async (req:Request, res:Response)=>{
  const {shareHash} = req.params;

  if(!shareHash){
    return res.status(401).json({
      message: "hash is required"
    })
  }

  const link = await LinkModel.findOne({hash:shareHash});

  if(!link){
    return res.status(401).json({
      message:"link not found"
    })
  }

  const content = await contentModel.findById(link.contentId);

  if(!content){
    return res.status(401).json({
      message:"content not found"
    })
  }

  return res.status(200).json({
    content
  })
}

export { createContent, getAllContent, deleteContent, shareContent, getShareContent, getContent  };