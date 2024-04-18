function formatDate(date:string):string {
    const d = new Date(date); 
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default formatDate;
