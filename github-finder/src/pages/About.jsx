function About() {
  return (
    <div>
      <h1 className="text-6xl mb-4">GitHub Finder</h1>
      <p className="mb-4 text-2xl font-light">
        A React app to search GitHub profiles and see profile details. This
        project is part of the
        <a href="https://www.udemy.com/course/modern-react-front-to-back/">
          {" "}
          React Front To Back
        </a>{" "}
        Udemy course by
        <strong>
          <a href="https://traversymedia.com"> Brad Traversy</a>
        </strong>
        .
      </p>
      <a href="https://github.com/michael-rodriguez22/COURSE-react-front-to-back-2022">
        <p className="text-xl text-gray-300">
          Click here to view project files and my review for the full course!
        </p>
      </a>
    </div>
  )
}

export default About
