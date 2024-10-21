import { TbTrash } from "react-icons/tb";

export default function CancelSubscription({ subscriptionId }) {

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
        window.location.reload(); // Reload the page to reflect the canceled subscription
      } else {
        console.error('Failed to cancel subscription:', result.error);
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  };

  const deleteAdatlap = async (subscriptionId) => {
    try {
      const response = await fetch('/api/deleteAdatlap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
      });

      const data = await data.json();

      if (response.ok) {
        console.log('Adatlap deleted successfully:', data);
        window.location.reload(); // Reload the page to reflect the canceled subscription
      } else {
        console.error('Failed to delete adatlap:', data.error);
      }
    } catch (error) {
      console.error('Error deleting adatlap:', error);
    }
  };

  const removeAdatlap = () => {
    cancelSubscription(subscriptionId);
    deleteAdatlap(subscriptionId)
  }

  return (
    <>
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
    </>
  );
}
