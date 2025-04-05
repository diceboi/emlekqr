import { NextResponse } from "next/server";
import connect from "../../Utils/db";
import Emlekadatlap from "../../(models)/Emlekadatlap";

export async function POST(request) {
  try {
    await connect();
    
    const { currentdata, freedata } = await request.json();
    
    if (!currentdata || !freedata || !currentdata.uri || !freedata.uri) {
      return NextResponse.json(
        { success: false, error: "Both current and trial data are required with URIs" },
        { status: 400 }
      );
    }
    
    console.log("Merging emlekadatlap data", {
      currentUri: currentdata.uri,
      freeUri: freedata.uri
    });
    
    // Create a new merged object from trialdata
    const mergedData = JSON.parse(JSON.stringify(freedata));
    
    // Remove the _id field to prevent MongoDB from trying to update it
    delete mergedData._id;
    
    // Preserve the original URI and owner from currentdata
    mergedData.uri = currentdata.uri;
    mergedData.owner = currentdata.owner;
    mergedData.paymentStatus = "paid"; // Set paymenstatus to paid since it's now an official emlekadatlap
    
    // Handle media URLs and other fields that might contain the original URI
    // Replace all occurrences of freedata.uri with currentdata.uri in string fields
    const replaceUriInString = (str) => {
      if (typeof str === 'string') {
        return str.replace(new RegExp(freedata.uri, 'g'), currentdata.uri);
      }
      return str;
    };
    
    // Process media images
    if (mergedData.media && mergedData.media.images && Array.isArray(mergedData.media.images)) {
      mergedData.media.images = mergedData.media.images.map(replaceUriInString);
    }
    
    // Process media videos
    if (mergedData.media && mergedData.media.videos && Array.isArray(mergedData.media.videos)) {
      mergedData.media.videos = mergedData.media.videos.map(replaceUriInString);
    }
    
    // Process profile image
    if (mergedData.profileimage) {
      mergedData.profileimage = replaceUriInString(mergedData.profileimage);
    }
    
    // Process cover image
    if (mergedData.coverimage) {
      mergedData.coverimage = replaceUriInString(mergedData.coverimage);
    }
    
    // Process story items if they exist
    if (mergedData.story && Array.isArray(mergedData.story)) {
      mergedData.story = mergedData.story.map(storyItem => {
        const updatedItem = { ...storyItem };
        
        // Process story item images
        if (updatedItem.images && Array.isArray(updatedItem.images)) {
          updatedItem.images = updatedItem.images.map(replaceUriInString);
        }
        
        return updatedItem;
      });
    }
    
    // Update the document in the database
    const updatedAdatlap = await Emlekadatlap.findOneAndUpdate(
      { uri: currentdata.uri }, // Filter by current URI
      { $set: mergedData },     // Update with merged data
      { new: true }             // Return the updated document
    );
    
    if (!updatedAdatlap) {
      return NextResponse.json(
        { success: false, error: "Emlekadatlap not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Emlekadatlap updated successfully",
      data: updatedAdatlap
    });
    
  } catch (error) {
    console.error("Error merging emlekadatlap data:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Error updating emlekadatlap",
        stack: error.stack
      },
      { status: 500 }
    );
  }
}