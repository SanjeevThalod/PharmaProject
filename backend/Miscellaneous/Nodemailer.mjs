import nodemailer from 'nodemailer';

const Nodemailer = async (notification,user)=>{
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'t2522948@gmail.com',
            pass:'reig gwur gfwg smpr'
        }
    })
    const mailOptions = {
        from:'t2522948@gmail.com',
        to:`${user.email}`,
        subject:'Medicine Reminder',
        text:`${notification.message}  \n MedicineId: ${notification.medicine}`
    }
    
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log('Error: ',error);
        }else{
            console.log('Success: ',info);
        }
    })
}

export default Nodemailer;