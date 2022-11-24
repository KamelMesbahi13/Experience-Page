import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Components/Loading/Loading';
import { FaAngleDoubleRight } from 'react-icons/fa';

const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await axios.get(url);
      setJobs(response.data)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <section className="section loading">
        <Loading />
      </section>
    )
  }

  const { company, dates, duties, title } = jobs[value]

  return (
    <section className="section">
      <div className='title'>
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>
        <div className='jobs-center'>
          <div className='btn-container'>
            {
              jobs.map((item, index) => {
                return (  
                  <button
                  className={`job-btn ${index === value && 'active-btn'}`}
                    key={item.id}
                    onClick={() => setValue(index)}
                  >{item.company}</button>
                )
              })
            }
          </div>
          <article className='job-info'>
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className='job-date'>{dates}</p>
            {
              duties.map((duty, index) => {
                return (
                  <div key={index} className='job-desc'>
                    <FaAngleDoubleRight className='job-icon'>

                    </FaAngleDoubleRight>
                    <p>{duty}</p>
                  </div>
                )
              })
            }
          </article>
        </div>
    </section>
  )
}

export default App