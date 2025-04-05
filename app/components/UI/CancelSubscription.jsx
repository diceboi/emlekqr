import { TbTrash } from "react-icons/tb";
import { toast } from "sonner";

export default function CancelSubscription({ subscriptionId, adatlapId }) {

  const cancelSubscription = async (subscriptionId) => {
    try {
      const response = await fetch('/api/stripe/cancelSubscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Subscription canceled successfully:', result);
      } else {
        console.error('Failed to cancel subscription:', result.error);
        toast.warning('Előfizetés nem tartozott az adatlaphoz.')
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  const deleteAdatlap = async (adatlapId) => {
    try {
      const response = await fetch('/api/deleteAdatlapId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adatlapId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Adatlap deleted successfully:', data);
        toast.success('Adatlap sikeresen törölve.')
        window.location.reload();
      } else {
        console.error('Failed to delete adatlap:', data.error);
      }
    } catch (error) {
      console.error('Error deleting adatlap:', error);
    }
  };

  const removeAdatlap = () => {
    cancelSubscription(subscriptionId);
    deleteAdatlap(adatlapId)
  }

  return (
    <>
    <div className="flex flex-col items-center gap-4">
      <h4>Biztosan törlöd az adatlapodat?</h4>
      <p className="text-center">Az adatlap törlése visszavonhatatlan. Ezzel a módosítással az adatlapod havi/évi előfizetése is megszűnik.</p>
      <button 
        className="flex flex-nowrap gap-2 items-center bg-[--error] hover:bg-[--error-hover] rounded-full transition-all text-white w-fit py-2 px-4"
        // Correctly use the onClick handler as a function reference
        onClick={removeAdatlap} // Pass the subscriptionId to the function
      >
        <TbTrash className="w-4 h-4 rounded-md text-white cursor-pointer" />
        Véglegesen törlöm
      </button>
    </div>
      
    </>
  );
}
