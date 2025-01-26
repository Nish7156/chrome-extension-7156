import React, { useEffect, useState } from 'react';

function SwiggeyPrice() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    let results = [];
    let clickCounter = 0;
    const maxClicks = 11;

    const intervalId = setInterval(() => {
      const targetDiv = document.querySelector('div._2uho9');

      if (targetDiv) {
        if (
          targetDiv.innerText.includes('To view older orders, please use Swiggy App') &&
          targetDiv.style.display === 'block' &&
          targetDiv.style.visibility === 'visible'
        ) {
          clearInterval(intervalId);
          extractData();
        } else {
          targetDiv.style.display = 'block';
          targetDiv.style.visibility = 'visible';
          targetDiv.removeAttribute('disabled');
          targetDiv.click();
          clickCounter++;
          console.log(`Div clicked programmatically. Click count: ${clickCounter}`);

          if (clickCounter >= maxClicks) {
            clearInterval(intervalId);
            extractData();
          }
        }
      } else {
        clearInterval(intervalId);
        extractData();
      }

      function extractData() {
        const dateDivs = document.querySelectorAll('div._2Yjbx');
        const priceSpans = document.querySelectorAll('div._2xH-a span._1H0ME');

        dateDivs.forEach((div, index) => {
          const dateText = div.querySelector('span')?.innerText.trim();
          const priceText = priceSpans[index]?.innerText.trim();

          if (dateText && priceText) {
            const price = parseFloat(priceText.replace(/,/g, ''));
            totalPrice += price;

            results.push({
              date: dateText,
              price: price,
            });
          }
        });

        setData(results);
        setTotal(totalPrice);
        setClickCount(clickCounter);

        console.log('Details:', results);
        console.log('Total Price:', totalPrice);
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Swiggy Order Details</h1>
      <p className="text-gray-600 mb-4">Click Count: {clickCount}</p>
      <div className="mt-4">
        <ul className="list-disc pl-5">
          {data.map((item, index) => (
            <li key={index} className="mb-2">
              <strong>Date:</strong> {item.date} | <strong>Price:</strong> ₹{item.price}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <strong>Total Price:</strong> ₹{total}
        </div>
      </div>
    </div>
  );
}

export default SwiggeyPrice;
