function AddTiffin(){

    return(
        <>
        <div className="addService rounded-4 px-md-5 px-3  text-start">
                <div className='asdf  mt-4'>
                    <h2 className="text-start">Add Tiffin</h2>
                </div>
                <form className="row g-3 mb-4">
                    <div className="col-md-6">
                        <label for="tiffinName" className="form-label">Tiffin Name</label>
                        <input type="text" className="form-control" for="tiffinName" />
                    </div>
                    <div className="col-md-6">
                        <label for="tiffinEmail" className="form-label">Price</label>
                        <input type="email" className="form-control" for="tiffinEmail" />
                    </div>
                    <div className="col-md-6">
                        <label for="tiffinImage" className="form-label">Image</label>
                        <input type="file" accept="image/png, image/jpeg, image/gif" className="form-control" for="tiffinImage" placeholder='Insert Image'/>
                    </div>
                    <div className="col-12">
                        <label for="tiffinAddress" className="form-label">description</label>
                        <textarea type="text" rows={5} className="form-control" for="tiffinAddress" placeholder="Traditional Maharastrian food" ></textarea>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-warning btn-lg mt-2">Add Tiffin</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddTiffin;