"use client";

import { 
  Button, 
  FieldError, 
  Input, 
  Label, 
  ListBox, 
  Modal, 
  Surface, 
  TextArea, 
  TextField, 
  Select 
} from "@heroui/react";
import { FaEdit } from "react-icons/fa";

const EditModal = ({ destinationData }) => {
 const onSubmit = async (e) => {
  e.preventDefault();

  // 1. Form-er dynamic values extract kora
  const formData = new FormData(e.currentTarget);
  const updatedData = Object.fromEntries(formData.entries());

  // 2. Data ashse kina check korar jonne log koro
  console.log("Form Submit Data:", updatedData);

  try {
    // 3. Backend API Request
    const res = await fetch(`http://localhost:5000/destination/${destinationData?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      console.log("Updated successfully in database!");
    }
  } catch (err) {
    console.error("Failed to update destination", err);
  }
};

  return (
    <Modal>
      <Modal.Trigger>
        <Button 
          size="sm" 
          variant="bordered" 
          className="border-gray-200 hover:border-cyan-500 hover:text-cyan-600 text-gray-700 flex items-center gap-1.5 text-xs font-semibold rounded-xl"
        >
          <FaEdit className="text-xs" /> Edit
        </Button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Destination</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="md:col-span-2">
                      <TextField name="destinationName" defaultValue={destinationData?.destinationName} isRequired>
                        <Label>Destination Name</Label>
                        <Input placeholder="Bali Paradise" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField name="country" defaultValue={destinationData?.country} isRequired>
                      <Label>Country</Label>
                      <Input placeholder="Indonesia" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    <TextField name="price" type="number" defaultValue={destinationData?.price} isRequired>
                      <Label>Price (USD)</Label>
                      <Input placeholder="1299" className="rounded-2xl" />
                      <FieldError />
                    </TextField>

                    <div className="md:col-span-2">
                      <TextField name="imageUrl" defaultValue={destinationData?.imageUrl} isRequired>
                        <Label>Image URL</Label>
                        <Input type="url" className="rounded-2xl" />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="md:col-span-2">
                      <TextField name="description" defaultValue={destinationData?.overview} isRequired>
                        <Label>Description</Label>
                        <TextArea className="rounded-3xl" />
                        <FieldError />
                      </TextField>
                    </div>

                  </div>

                  {/* Save Changes Button */}
                  <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl mt-4 py-2.5 transition-all">
                    Save Changes
                  </Button>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditModal;