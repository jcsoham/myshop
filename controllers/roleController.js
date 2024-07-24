const Role = require('../models/Role');

// Controller functions
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json({ status: 1, message: 'Roles fetched successfully', data: roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ status: 0, error: 'Error fetching roles' });
  }
};

exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ status: 0, error: 'Role not found' });
    }
    res.status(200).json({ status: 1, message: 'Role fetched successfully', data: role });
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({ status: 0, error: 'Error fetching role' });
  }
};

exports.createRole = async (req, res) => {
  const newRole = req.body;
  try {
    const createdRole = await Role.create(newRole);
    res.status(201).json({ status: 1, message: 'Role created successfully', data: createdRole });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ status: 0, error: 'Error creating role' });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const roleData = req.body;
  try {
    const updatedRole = await Role.update(id, roleData);
    res.status(200).json({ status: 1, message: 'Role updated successfully', data: updatedRole });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ status: 0, error: 'Error updating role' });
  }
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    await Role.delete(id);
    res.status(200).json({ status: 1, message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ status: 0, error: 'Error deleting role' });
  }
};
