const myForm = document.querySelector('#my-form');
const expenceAmount = document.querySelector('#expenceAmount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');
const userList = document.querySelector('#users');


async function displayOnScreen(){
    try{
        const res=await axios
        .get(`https://crudcrud.com/api/d712e69e2fdc4cb9b117c5ce26161699/practice`);
        console.log(JSON.stringify(res.data)+"inget");
        userList.innerHTML='';

        res.data.forEach(item => {
            const li=document.createElement('li')
            li.appendChild(document.createTextNode(`Expence: $${item.expenceAmount}- ${item.description}- ${item.category}`));
            


            var deleteBtn=document.createElement('button');
            deleteBtn.className='btn btn-outline-danger btn-sm'
            deleteBtn.appendChild(document.createTextNode('Delete'))
            li.appendChild(deleteBtn);

            deleteBtn.addEventListener('click',()=>del(item._id,li))

            var editBtn=document.createElement('button');
            editBtn.className='btn btn-outline-info btn-sm float-right'
            editBtn.appendChild(document.createTextNode('Edit'));
            li.appendChild(editBtn)

            editBtn.addEventListener('click',()=>edit(item,item._id))

            userList.appendChild(li);

        });

    }catch(err){
        console.log(err)
    }
}

myForm.addEventListener('submit',onSubmit);

async function onSubmit(e){
    try{
        e.preventDefault();
        const expenceAmount=e.target.expenceAmount.value;
        const category=e.target.category.value;
        const description=e.target.description.value;

        let data={
            expenceAmount,
            category,
            description
        }
        console.log(JSON.stringify(data)+"data!!!")
        e.target.expenceAmount.value='';
        e.target.category.value='';
        e.target.description.value='';

        const res= await axios
        .post(`https://crudcrud.com/api/d712e69e2fdc4cb9b117c5ce26161699/practice`,data);
        id=res.data._id;
        console.log(JSON.stringify(res.data)+"inpost");
         return displayOnScreen()

    }
    catch(err){
        console.log(err)
    }
}


async function del(id,li){
    li.remove();
    try{
        const res=await axios.delete(`https://crudcrud.com/api/d712e69e2fdc4cb9b117c5ce26161699/practice/${id}`);
        console.log(res);
        console.log(id);
    }catch(err){
        console.log(err)
    }
}


async function edit(item,id){
    let updatedItem={
        expenceAmount :item.expenceAmount,
            description :item.description,
            category:item.category
    }
    console.log(updatedItem);
    try{
        const res=await axios
        .put(`https://crudcrud.com/api/d712e69e2fdc4cb9b117c5ce26161699/practice/${id}`,updatedItem);
        console.log(JSON.stringify(res.data)+"???")

        expenceAmount.value = updatedItem.expenceAmount;
        description.value = updatedItem.description;
        category.value = updatedItem.category;

    }
    catch(err){
        console.log(err);
    }
} 




displayOnScreen()