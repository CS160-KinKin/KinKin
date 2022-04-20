import { useState} from "react";

function ProfileInfoBox() {
    //pass in props here? for default name values etc,
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [isPT, setPT] = useState(false)
    const [isClient, setClient] = useState(false)


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
                <div>Name</div>
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div>ph</div>
                <input
                    type='text'
                    placeholder='ph'
                />
                <div>Do you want to be a trainer?</div>
                <input
                    type='checkbox'
                    checked={isPT}
                    value={isPT}
                    onChange={(e) => setPT(e.currentTarget.checked)}
                />
                <div>Do you want to be a client?</div>
                <input
                    type='checkbox'
                    checked={isClient}
                    value={isClient}
                    onChange={(e) => setClient(e.currentTarget.checked)}
                />
                <div></div>
                <input type='submit' value='submit' className='btn' />
            </div>
        </form>
    )

}

export default ProfileInfoBox;