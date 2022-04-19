import { useState} from "react";

function ProfileInfoBox() {
    //pass in props here? for default name values etc,
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [userStatus, setUserStatus] = useState('')

    return (
        <form>
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
            </div>
        </form>
    )

}

export default ProfileInfoBox;