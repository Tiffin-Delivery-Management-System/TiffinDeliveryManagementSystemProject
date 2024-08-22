import React, { useState } from 'react';
import axios from 'axios';

function AddTiffin() {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: null,
        tiffinServiceId: '', // Ensure this is a string if you're handling it as such
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 3 * 1024 * 1024) { // Check if file size exceeds 3MB
                setError('Image file size must be less than 3MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert image to base64 string
                setFormData({ ...formData, image: reader.result.split(',')[1] });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }
        data.append('tiffinServiceId', formData.tiffinServiceId); // Make sure this key matches what the backend expects

        try {
            const response = await axios.post('http://localhost:8080/manager/addtiffin', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Success:', response.data);
            setSuccess('Tiffin added successfully!');
            // Handle success (e.g., show a success message or redirect)
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to add tiffin. Please try again.');
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="addService rounded-4 px-md-5 px-3 text-start">
            <div className='asdf mt-4'>
                <h2 className="text-start">Add Tiffin</h2>
            </div>
            <form className="row g-3 mb-4" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="tiffinName" className="form-label">Tiffin Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tiffinName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required // Ensure field is required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="tiffinPrice" className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="tiffinPrice"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required // Ensure field is required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="tiffinImage" className="form-label">Image</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        className="form-control"
                        id="tiffinImage"
                        name="image"
                        onChange={handleImageChange}
                        required // Ensure field is required
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="tiffinDescription" className="form-label">Description</label>
                    <textarea
                        rows={5}
                        className="form-control"
                        id="tiffinDescription"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required // Ensure field is required
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="tiffinServiceId" className="form-label">Tiffin Service ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="tiffinServiceId"
                        name="tiffinServiceId"
                        value={formData.tiffinServiceId}
                        onChange={handleChange}
                        required // Ensure field is required
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-warning btn-lg mt-2">Add Tiffin</button>
                </div>
            </form>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
        </div>
    );
}

export default AddTiffin;