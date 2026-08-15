import { AlertDialog, Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";


const DeleteDialog = ({destinationData}) => {
       const {destinationName} = destinationData;
        const handleDelete = async () => {
              const res = await fetch(`http://localhost:5000/destination/${_id}`, {
                
                   method: "DELETE",
                   headers: {
                      "content-type": "application/json"
                   }
                })

                const data = await res.json();
                 redirect('/destinations')
                console.log(data)

        }
    return (
        
    <AlertDialog>
     <Button size="sm" variant="flat" color="danger" className="bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center gap-1.5 text-xs font-semibold rounded-xl">
            <FaTrash className="text-xs" /> Delete
          </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destinationName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button  onClick={handleDelete} slot="close" variant="danger">
                Delete 
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
    );
};

export default DeleteDialog;