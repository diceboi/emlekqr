  'use client'

  import { createContext, useState } from "react";

  export const UpdateEmlekadatlapContext = createContext({
    formData: {},
    updateFormData: (path, value) => {},
    addStoryBlock: () => {},
    removeStoryBlock: (index) => {},
    updateFileNames: () => {},
    blobMediaImages: [],
    setBlobMediaImages: () => {},
    blobStoryImages: [],
    setBlobStoryImages: () => {},
    updateBlobStoryImages: () => {}   
  });

  export default function UpdateEmlekadatlapContextProvider({ children }) {
    const initialData = {
      uri: '',
      name: '',
      age: '',
      graveyard: '',
      bio: '',
      story: [
        {
          year: '',
          type: '',
          data: '',
          images: [],
        },
      ],
      media: {
        images: [],
        videos: [],
      },
      tributes: '',
      profileimage: '',
      coverimage: '',
      owner: '',
      coowner: '',
      born: '',
      died: '',
      quote: '',
    };

    const [formData, setFormData] = useState(initialData);
    const [selectedImages, setSelectedImages] = useState([]);
    const [blobMediaImages, setBlobMediaImages] = useState([]);
    const [blobStoryImages, setBlobStoryImages] = useState({});

    const updateFormData = (path, value) => {
      setFormData((prevData) => {
        const keys = path.split(".");
        const lastKey = keys.pop();
    
        const deepClone = (obj) => {
          return JSON.parse(JSON.stringify(obj));
        };
    
        const updatedData = deepClone(prevData);
        let nested = updatedData;
    
        keys.forEach((key) => {
          // Ensure that each nested key exists, otherwise initialize it as an empty object or array
          if (!(key in nested)) {
            nested[key] = isNaN(Number(keys[0])) ? {} : [];
          }
          nested = nested[key];
        });
    
        nested[lastKey] = value;
    
        return updatedData;
      });
    };

    const addStoryBlock = () => {
      setFormData((prevData) => ({
        ...prevData,
        story: [
          ...prevData.story,
          {
            year: '',
            type: '',
            data: '',
            images: [],
          },
        ],
      }));
    };

    const removeStoryBlock = (index) => {
      setFormData((prevData) => {
        const updatedStory = [...prevData.story];
        const removedBlock = updatedStory.splice(index, 1); // Remove the specific block
        
        // Remove associated images
        const removedImages = removedBlock[0]?.images || [];
        setSelectedImages((prevImages) =>
          prevImages.filter((image) => !removedImages.includes(image))
        );
  
        return {
          ...prevData,
          story: updatedStory, // Update the story array
        };
      });
    };

    const updateFileNames = (images) => {
      setSelectedImages(images);
    };

    const updateBlobStoryImages = (index, newImages) => {
      setBlobStoryImages((prev) => ({
        ...prev,
        [index]: newImages,
      }));
    };

    return (
      <UpdateEmlekadatlapContext.Provider value={{ 
        formData,
        updateFormData,
        selectedImages,
        updateFileNames,
        addStoryBlock,
        removeStoryBlock,
        blobMediaImages,
        setBlobMediaImages,
        blobStoryImages,
        setBlobStoryImages,
        updateBlobStoryImages
      }}>
        {children}
      </UpdateEmlekadatlapContext.Provider>
    );
  }
