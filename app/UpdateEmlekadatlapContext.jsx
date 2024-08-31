  'use client'

  import { createContext, useState } from "react";

  export const UpdateEmlekadatlapContext = createContext({
    formData: {},
    updateFormData: (path, value) => {},
    addStoryBlock: () => {},
    updateFileNames: () => {},  
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

    const updateFileNames = (images) => {
      setSelectedImages(images);
    };

    return (
      <UpdateEmlekadatlapContext.Provider value={{ formData, updateFormData, selectedImages, updateFileNames, addStoryBlock }}>
        {children}
      </UpdateEmlekadatlapContext.Provider>
    );
  }
