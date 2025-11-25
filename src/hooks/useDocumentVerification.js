import { useState, useCallback } from 'react';
import { verifyDocument, generateNotificationEvent } from '../services/simulationService';
import { useNotification } from '../context/NotificationContext';

/**
 * useDocumentVerification Hook
 * Manages document verification state, loading, and side effects.
 * Demonstrates clean separation of concerns between logic and UI.
 */
export const useDocumentVerification = (studentId) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState([]);
  const [error, setError] = useState(null);
  const { addNotification } = useNotification();

  /**
   * Verify a single document
   */
  const verifySingleDocument = useCallback(
    async (document) => {
      try {
        const result = await verifyDocument(document, studentId);

        // Trigger notification based on verification result
        const notifData = await generateNotificationEvent(
          'verification',
          result.status === 'Verified' ? 'success' : result.status === 'Pending' ? 'warning' : 'error',
          `Document "${result.fileName}" - ${result.status}`,
          studentId
        );

        addNotification(
          notifData.severity,
          notifData.message,
          studentId,
          5000
        );

        return result;
      } catch (err) {
        const errorMsg = `Failed to verify "${document.name || 'document'}"`;
        addNotification('error', errorMsg, studentId, 5000);
        throw err;
      }
    },
    [studentId, addNotification]
  );

  /**
   * Verify multiple documents
   */
  const verifyDocuments = useCallback(
    async (documents) => {
      setIsVerifying(true);
      setError(null);
      setVerificationResults([]);

      try {
        const results = await Promise.all(
          documents.map((doc) => verifySingleDocument(doc))
        );

        setVerificationResults(results);

        // Add summary notification
        const fraudCount = results.filter((r) => r.status === 'Flagged as Fake').length;
        const verifiedCount = results.filter((r) => r.status === 'Verified').length;

        if (fraudCount > 0) {
          addNotification(
            'error',
            `⚠️ Verification complete: ${verifiedCount} verified, ${fraudCount} flagged as fake`,
            studentId,
            6000
          );
        } else {
          addNotification(
            'success',
            `✓ All ${verifiedCount} documents verified successfully`,
            studentId,
            5000
          );
        }

        return results;
      } catch (err) {
        const errorMessage = 'Verification process failed. Please try again.';
        setError(errorMessage);
        addNotification('error', errorMessage, studentId, 6000);
        throw err;
      } finally {
        setIsVerifying(false);
      }
    },
    [verifySingleDocument, studentId, addNotification]
  );

  /**
   * Clear results and errors
   */
  const reset = useCallback(() => {
    setVerificationResults([]);
    setError(null);
    setIsVerifying(false);
  }, []);

  return {
    isVerifying,
    verificationResults,
    error,
    verifyDocuments,
    verifySingleDocument,
    reset,
  };
};

export default useDocumentVerification;
