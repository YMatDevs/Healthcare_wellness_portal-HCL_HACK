import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import useProfileStore from "../stores/useProfileStore";
import usePatientStore from "../stores/usePatientStore";
import useProviderStore from "../stores/useProviderStore";

export default function ProfilePage() {
//   const { user } = useProfileStore();
const user = { role: 'patient' }
  const { profile, updateProfile, isLoading: isPatientLoading } = usePatientStore();
  const { provider, updateProvider, isLoading: isProviderLoading } = useProviderStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Sync local form state when data loads or when editing is turned off
useEffect(() => {
  // 1. If the user is currently typing, don't overwrite their changes
  if (isEditing) return;

  // 2. Determine which data source to use
  const sourceData = user?.role === "patient" ? profile : provider;

  // 3. Only update if sourceData exists to avoid setting {} infinitely
  if (sourceData) {
    setFormData(sourceData);
  }
}, [profile, provider, user?.role, isEditing]); 
// Use user?.role as a dependency instead of the whole user object for stability

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    let success = false;
    if (user.role === "patient") {
      const res = await updateProfile(formData);
      success = res.success;
    } else {
      const res = await updateProvider(formData);
      success = res.success;
    }
    if (success) setIsEditing(false);
  };

  if (!user) return <div className="p-5 text-center">Loading Account...</div>;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          {/* Section 1: Non-Editable Account Data */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h4 className="fw-bold mb-1">Account Information</h4>
                  <p className="text-muted small">System-managed credentials</p>
                </div>
                <Badge bg="secondary" className="text-uppercase px-3 py-2">
                  {user.role}
                </Badge>
              </div>
              <Row>
                <Col md={6} className="mb-3">
                  <label className="text-muted small d-block">Email Address</label>
                  <div className="fw-semibold text-dark p-2 bg-light rounded border">
                    {user.email}
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <label className="text-muted small d-block">User ID</label>
                  <code className="p-2 bg-light rounded border d-block text-truncate">
                    {user.id}
                  </code>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Section 2: Editable Profile Data */}
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 p-4 d-flex justify-content-between align-items-center">
              <h4 className="fw-bold mb-0">Personal Profile</h4>
              {!isEditing ? (
                <Button variant="outline-primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <div className="d-flex gap-2">
                  <Button variant="link" className="text-muted" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave} disabled={isPatientLoading || isProviderLoading}>
                    {isPatientLoading || isProviderLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </Card.Header>
            <Card.Body className="p-4 pt-0">
              <Form>
                <h6 className="text-primary mb-3">Basic Details</h6>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label className="small text-muted">First Name</Form.Label>
                    <Form.Control
                      name="first_name"
                      value={formData.first_name || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label className="small text-muted">Last Name</Form.Label>
                    <Form.Control
                      name="last_name"
                      value={formData.last_name || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </Col>

                  {user.role === "patient" && (
                    <>
                      <Col md={6} className="mb-3">
                        <Form.Label className="small text-muted">Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="date_of_birth"
                          value={formData.date_of_birth || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Label className="small text-muted">Gender</Form.Label>
                        <Form.Select
                          name="gender"
                          value={formData.gender || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </Form.Select>
                      </Col>

                      <hr className="my-4" />
                      <h6 className="text-primary mb-3">Medical Information</h6>
                      
                      <Col xs={12} className="mb-3">
                        <Form.Label className="small text-muted">Known Allergies</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="allergies"
                          placeholder="e.g., Penicillin, Peanuts..."
                          value={formData.allergies || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Col>
                      
                      <Col xs={12} className="mb-3">
                        <Form.Label className="small text-muted">Current Medications</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="medications"
                          placeholder="List names and dosages..."
                          value={formData.medications || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Col>
                    </>
                  )}

                  {user.role === "provider" && (
                    <Col xs={12} className="mb-3">
                      <Form.Label className="small text-muted">Organization ID</Form.Label>
                      <Form.Control
                        value={formData.organization_id || ""}
                        disabled={true}
                        className="bg-light"
                      />
                    </Col>
                  )}
                </Row>

                {/* Privacy & Consent Section */}
                <hr className="my-4" />
                <div className={`p-3 rounded ${isEditing ? 'bg-light border border-primary-subtle' : ''}`}>
                  <Form.Check 
                    type="checkbox"
                    id="consent-checkbox"
                    label="I consent to the collection and processing of my health data for clinical use."
                    name="consent_given"
                    checked={formData.consent_given || false}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="small fw-bold"
                  />
                  <Form.Text className="text-muted d-block ms-4">
                    Required for accurate diagnosis and record keeping.
                  </Form.Text>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}