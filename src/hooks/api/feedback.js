



export const sendFeedback = async (id, notes) => {
    const apiUrl = 'https://calik.app/api/feedbackApi';
    
    const data = {
      key_id: id ,
      notes: notes,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error Posting Feedback', error);
      throw error
    }
  };