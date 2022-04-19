import { useState} from "react";

function ProfileInfoBox() {
    //pass in props here? for default name values etc,
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [userStatus, setUserStatus] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        //API to backend
    }

    return (
        <form className="form">
            <div>
                <div>Birthday</div>
                <input
                type='text'
                placeholder='birthday'
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                />
                <div>Status</div>
                <input
                    type='text'
                    placeholder='click box here?'
                    value={userStatus}
                    onChange={(e) => setUserStatus(e.target.value)}
                />
                <div>Name</div>
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div>these</div>
                <input
                    type='text'
                    placeholder='these'
                />
                <div>are</div>
                <input
                    type='text'
                    placeholder='are'
                />
                <div>placeholders</div>
                <input
                    type='text'
                    placeholder='placeholders'
                />
                <div></div>
                <input type='submit' value='submit' className='btn' />
            </div>
        </form>
    )

}

export default ProfileInfoBox;