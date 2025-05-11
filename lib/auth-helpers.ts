/**
 * Checks if the user's email is verified
 * @param email User's email address
 * @returns Boolean indicating if email is verified
 */
export async function checkEmailVerification(email: string) {
  try {
    const response = await fetch(`/api/check-user?email=${email}`);
    const data = await response.json();
    return data && data.emailVerified;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
}

/**
 * Checks if a user with the given email exists in the database
 * @param email User's email address
 * @returns Boolean indicating if user exists
 */
export async function checkUserExists(email: string) {
  try {
    const response = await fetch(`/api/check-user?email=${email}`);
    const data = await response.json();
    // Return true if we got valid data and the user ID exists
    return data && data.id;
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
}
