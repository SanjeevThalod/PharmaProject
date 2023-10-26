import CareTaker from '../Models/caretakerModel.mjs';

const assign = async (req, res) => {
    try {
        const { userId } = req.user;
        const { CareTakerId } = req.body;

        const check = await CareTaker.findOne({userId});

        if(check){
            await CareTaker.updateOne(
                { userId },
                { $push: { caretakers: CareTakerId } }
            );
            res.status(201).json({success:'true',message:'CareTaker Assigned'});
        }

        const data = await CareTaker.create({
            userId,
            caretakerId: CareTakerId
        })

        res.status(201).json({ success: 'true', message: 'CareTaker Assigned' });
    } catch (error) {
        res.status(400).json({ success: 'false', message: 'Error Assigning CareTaker' });
    }
}

const findCareTaker = async (req, res) => {
    try {
        const { userId } = req.user;

        const data = await CareTaker.find({userId});

        res.status(201).json({success:'true',data:data.caretakers});
    } catch (error) {
        res.status(400).json({success:'false',message:'Internal server Error'});
    }
}

export { assign, findCareTaker }