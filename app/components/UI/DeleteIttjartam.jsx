import { TbTrash } from "react-icons/tb";
import { toast } from "sonner";

export default function DeleteIttjartam({ id }) {

  const deleteIttjartam = async (id) => {
    try {
      const response = await fetch('/api/deleteIttjartam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Ittjartam deleted successfully:', result);
        toast.success('Üzenet sikeresen törölve.')
        window.location.reload();
      } else {
        console.error('Failed to delete ittjartam:', result.error);
        toast.warning('Az üzenetet nem sikerült törölni, kérlek próbáld újra később.')
      }
    } catch (error) {
      console.error('Error deleting ittjartam:', error);
    }
  };

  return (
    <>
    <div className="flex flex-col items-center gap-4">
      <h4>Biztosan törlöd az üzeneted?</h4>
      <p className="text-center">Ez a módosítás visszavonhatatlan.</p>
      <button 
        className="flex flex-nowrap gap-2 items-center bg-[--error] hover:bg-[--error-hover] rounded-full transition-all text-white w-fit py-2 px-4"
        // Correctly use the onClick handler as a function reference
        onClick={() => deleteIttjartam(id)} // Pass the subscriptionId to the function
      >
        <TbTrash className="w-4 h-4 rounded-md text-white cursor-pointer" />
        Véglegesen törlöm
      </button>
    </div>
      
    </>
  );
}
