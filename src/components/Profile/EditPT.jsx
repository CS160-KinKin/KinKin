import React from "react";

function EditPT() {
  return (
    <div class="card">
          <h2>Edit Profile</h2>
      <form>
        <img src="blank-profile.png" alt="Profile Picture" width="100" />
        <label>
            Name:
            <input type="text" name="name" />
        </label>
        <hr size="1" width="100%" color="black" />
        <label>
            Bio:
            <input type="text" name="bio" />
        </label>
        <br />
        <label>
            Specialties:
            <input type="text" name="specialties" />
        </label>
        <br />
        <label>
            Training Style:
            <input type="text" name="training" />
        </label>
        <br />
        <label>
            Pricing:
            <input type="text" name="pricing" />
        </label>
        <br />
        <label>
            Working Hours:
            <input type="text" name="hours" />
        </label>
        <br />
        <label>
            Location:
            <select>
                <option value="nyc">New York City, NY, USA</option>
                <option value="la">Los Angeles, CA, USA</option>
                <option value="austin">Austin, TX, USA</option>
            </select>
        </label>
        <br />
        <label>
            Language:
            <select>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="chinese">Chinese</option>
            </select>
        </label>
        <br />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default EditPT;