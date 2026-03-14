import { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { RadialCard } from "../components/Cards/RadialCard";
import { ProgressCard } from "../components/Cards/ProgressCard";
import { NumberCard } from "../components/Cards/NumberCard";
import { IconMetric } from "../components/Cards/IconMetric";
import { PercentageCard } from "../components/Cards/PercentageCard";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [goals, setGoals] = useState([
    { id: 1, type: 'Radial', title: 'Steps', value: 6000, max: 10000 },
    { id: 2, type: 'Progress', title: 'Steps', value: 6000, max: 10000 },
    { id: 3, type: 'Number', title: 'Active Time', value: 50, unit: 'min' }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    value: '',
    max: '',
    type: 'Radial'
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      id: Date.now(),
      ...formData,
      value: Number(formData.value),
      max: Number(formData.max)
    };
    setGoals([...goals, newGoal]);
    handleClose();
  };

  // Helper to render the correct card based on type
  const renderCard = (goal) => {
    switch (goal.type) {
      case 'Radial': return <RadialCard title={goal.title} value={goal.value} max={goal.max} />;
      case 'Progress': return <ProgressCard label={goal.title} value={goal.value} max={goal.max} />;
      case 'Number': return <NumberCard title={goal.title} value={goal.value} unit="units" />;
      default: return <RadialCard {...goal} />;
    }
  };

  return (
    <>
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Health Metrics</h2>
          <Button variant="primary" onClick={handleShow} >
            + Add Goal
          </Button>
        </div>

        <Row className="g-3">
          {goals.map((goal) => (
            <Col md={4} key={goal.id}>
              {renderCard(goal)}
            </Col>
          ))}
          {/* Keep your static ones if needed */}
          <Col md={4}><IconMetric icon="🔥" title="Calories" value="430" /></Col>
          <Col md={4}><PercentageCard label="Weekly Steps" current={42000} goal={70000} /></Col>
        </Row>
      </Container>

      {/* Add Goal Modal */}
      <Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Set New Wellness Goal</Modal.Title>
  </Modal.Header>
  <Form onSubmit={handleSubmit}>
    <Modal.Body>
      <Form.Group className="mb-3">
        <Form.Label>Goal Title</Form.Label>
        <Form.Control 
          required 
          placeholder="e.g., Water Intake" 
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </Form.Group>
      
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Current Value</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="0"
              onChange={(e) => setFormData({...formData, value: e.target.value})}
            />
          </Form.Group>
        </Col>

        {/* Conditional Rendering: Hide Target if Number or Icon is selected */}
        {formData.type !== 'Number' && formData.type !== 'Icon' ? (
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Target/Max</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="100"
                onChange={(e) => setFormData({...formData, max: e.target.value})}
              />
            </Form.Group>
          </Col>
        ) : (
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>{formData.type === 'Icon' ? 'Emoji/Icon' : 'Unit'}</Form.Label>
              <Form.Control 
                type="text" 
                placeholder={formData.type === 'Icon' ? '🔥' : 'min'}
                onChange={(e) => setFormData({
                  ...formData, 
                  [formData.type === 'Icon' ? 'icon' : 'unit']: e.target.value 
                })}
              />
            </Form.Group>
          </Col>
        )}
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Display Style</Form.Label>
        <Form.Select 
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="Radial">Radial Chart</option>
          <option value="Progress">Progress Bar</option>
          <option value="Number">Simple Number</option>
          <option value="Icon">Icon Display</option>
          <option value="Fraction">Fraction Display</option>
        </Form.Select>
      </Form.Group>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="link" onClick={handleClose} className="text-muted">
        Cancel
      </Button>
      <Button 
        type="submit" 
        style={{ border: 'none' }}
      >
        Save Goal
      </Button>
    </Modal.Footer>
  </Form>
</Modal>
    </>
  );
}