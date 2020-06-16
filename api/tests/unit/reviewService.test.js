import reviewService from '../../services/reviewService'
import employeeService from '../../services/employeeService'
import { truncateDatabase } from './testUtils'

beforeEach(async () => {
  await truncateDatabase()
})

function buildReviewer() {
  return {
    first_name: 'Felipe',
    last_name: 'Chiapini',
    position: 'Software Engineer',
    email: 'felipe5@example.com',
    password_hash: '123456',
  }
}

function buildReviewee() {
  return {
    first_name: 'Paul',
    last_name: 'Johnson',
    position: 'Software Engineer',
    email: 'john@example.com',
    password_hash: '123456',
  }
}

describe('Create', () => {
  it('should create a review with valid parameters', async () => {
    const reviewer = buildReviewer()
    const reviewee = buildReviewee()

    const feedback =
      'Hardworking and team leader. Contribute with teamates professional development.'

    const savedReviewer = await employeeService.create(reviewer)
    const savedReviewee = await employeeService.create(reviewee)

    const createdReview = await reviewService.create(
      feedback,
      savedReviewer.id,
      savedReviewee.id
    )

    expect(createdReview.feedback).toBe(feedback)
    expect(createdReview.reviewer_id).toBe(savedReviewer.id)
    expect(createdReview.reviewee_id).toBe(savedReviewee.id)
  })
})

describe('Update', () => {
  it('should update feedback from review with valid parameters', async () => {
    const reviewer = buildReviewer()
    const reviewee = buildReviewee()

    const feedback =
      'Hardworking and team leader. Contribute with teamates professional development.'

    const savedReviewer = await employeeService.create(reviewer)
    const savedReviewee = await employeeService.create(reviewee)

    const reviewToBeUpdated = await reviewService.create(
      feedback,
      savedReviewer.id,
      savedReviewee.id
    )

    const newFeedback = 'Great communication and strong opinion.'

    const updatedReview = await reviewService.update(
      reviewToBeUpdated.id,
      newFeedback
    )

    expect(updatedReview.feedback).toBe(newFeedback)
  })
})

describe('Delete', () => {
  it('should delete review with valid id', async () => {
    const reviewer = buildReviewer()
    const reviewee = buildReviewee()

    const feedback =
      'Hardworking and team leader. Contribute with teamates professional development.'

    const savedReviewer = await employeeService.create(reviewer)
    const savedReviewee = await employeeService.create(reviewee)

    const reviewToBeDeleted = await reviewService.create(
      feedback,
      savedReviewer.id,
      savedReviewee.id
    )

    await reviewService.delete(reviewToBeDeleted.id)

    const deletedReview = await reviewService.findReviewById(
      reviewToBeDeleted.id
    )

    expect(deletedReview).toBeNull()
  })
})
