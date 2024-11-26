
export const detectImage = async (base64Image) => {
    const apiUrl = 'https://api.ximilar.com/detection/v2/detect';
    const apiToken = '2fe69b4ff4cd078554662fb318c06ba03367a6da'; 
    const taskId = '4c36795e-dd80-41a4-93d6-2669222c7b92'; 
  
    const data = {
      task_id: taskId,
      version: 1,
      descriptor: 0,
      records: [
        {
            _base64: base64Image, 
        },
      ],
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${apiToken}`,
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
      console.error('Error detecting image:', error);
      throw error
    }
  };
  

  