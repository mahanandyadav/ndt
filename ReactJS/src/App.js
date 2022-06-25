import React, { Component } from 'react'
import './App.css'

class Home extends Component {
  state = {
    show: false,
    data: [],
    rating: 1,
  }

  handleGetData = () => {
    fetch('/api/courses/get')
      .then((res) => {
        if (res.ok) {
          res.json().then((json) => {
            this.setState({ data: json })
          })
        }
      })
      .catch((err) => console.log(err))
  }

  componentDidMount = () => {
    this.handleGetData()
  }

  handleApply = async (id) => {
    fetch(`/api/courses/enroll/${id}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        // console.log(res)
        // if(res.ok){ it will be false for 403 status
        /*if (res.status === 200) */ this.handleGetData()
        res.json().then((data) => {
          if (!data.message) {
            alert(data.error)
          } else {
            alert(data.message)
          }
        })
        // }
      })
      .catch((err) => console.log('@App.js' + err))
  }

  handleRating = (e) => {
    // Write your code here
    console.log(e.target.value)
    this.setState({ rating: e.target.value })
  }

  handleAddRating = async (id) => {
    // Write your code here
    let payload = { rating: this.state.rating }
    fetch(`/api/courses/rating/${id}`, {
      // headers: {"Content-type": "application/json"},
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        res.json().then((data) => {
          this.handleGetData()
          if (!data.error) {
            // alert(data.message)
          } else {
            alert(data.error)
          }
        })
      })
      .catch((e) => console.log(e + 'error in rating'))
  }

  handleDrop = async (id) => {
    // Write your code here
    fetch('/api/courses/drop/' + id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status === 200) {
          this.handleGetData()
        }
        res.json().then((data) => {
          if (!data.message) {
            alert(data.error)
          } else {
            alert(data.message)
          }
        })
      })
      .catch((e) => console.log(e))
  }

  render() {
    const node = this.state.data.map((course) => (
      <div className='card' key={course._id}>
        <ul>
          <div className='header'>
            <li>{course.courseName}</li>
            <li>{course.courseDept}</li>
            <li>{course.description /*2 */}</li>

            <li>
              {
                /*3 */
                course.isApplied && course.isRated === false && (
                  <li>
                    Rate:
                    <select
                      className='rating'
                      name='rating'
                      onChange={(e) => this.handleRating(e)}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                    {
                      <button
                        className='rate'
                        disabled={false}
                        onClick={() => this.handleAddRating(course._id)}
                      >
                        Add
                      </button>
                    }
                  </li>
                )
              }

              {course.isApplied && (
                <button
                  className='drop'
                  onClick={() => this.handleDrop(course._id)}
                >
                  Drop Course
                </button>
              )}

              {!course.isApplied /*4 */ && (
                <button
                  className='btn'
                  onClick={() => this.handleApply(course._id)}
                >
                  Apply
                </button>
              )}
            </li>
          </div>
          <div className='footer'>
            <li>{`${course.duration} hrs . ${course.noOfRatings} Ratings . ${course.rating}/5`}</li>
          </div>
        </ul>
      </div>
    ))
    return (
      <div className='home'>
        <header>
          <h2>ABC Learning</h2>
        </header>
        {/* write your code here */}
        <div className='cardContainer'>{node}</div>
      </div>
    )
  }
}

export default Home
